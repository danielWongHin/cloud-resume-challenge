import azure.functions as func
import logging
import os
from azure.cosmos import CosmosClient, PartitionKey
from azure.cosmos.exceptions import CosmosResourceNotFoundError

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# ----------------------------
# Cosmos DB Helpers
# ----------------------------

def cosmos_container():
    endpoint = os.environ["COSMOS_ENDPOINT"]
    key = os.environ["COSMOS_KEY"]
    db_name = os.environ.get("COSMOS_DB_NAME", "viewCounterDb")
    container_name = os.environ.get("COSMOS_CONTAINER_NAME", "counter")

    client = CosmosClient(endpoint, credential=key)
    database = client.get_database_client(db_name)
    container = database.get_container_client(container_name)
    return container

# Document ID to store the counter
def counter_id():
    return os.environ.get("COUNTER_ID", "global")

# ----------------------------
# GET: Return current count
# ----------------------------

def get_count():
    container = cosmos_container()
    doc_id = counter_id()

    try:
        item = container.read_item(item=doc_id, partition_key=doc_id)
        count = int(item.get("value", 0))
    except CosmosResourceNotFoundError:
        count = 0

    return func.HttpResponse(str(count), status_code=200, mimetype="application/json")

# ----------------------------
# POST: Increment count
# ----------------------------

def increment_count():
    container = cosmos_container()
    doc_id = counter_id()

    try:
        # Read existing item
        item = container.read_item(item=doc_id, partition_key=doc_id)
        new_val = int(item.get("value", 0)) + 1
        item["value"] = new_val
        container.replace_item(item=doc_id, body=item)

    except CosmosResourceNotFoundError:
        # Create new item if first time
        new_val = 1
        item = {"id": doc_id, "value": new_val}
        container.create_item(body=item)

    return func.HttpResponse(str(new_val), status_code=200, mimetype="application/json")

# ----------------------------
# HTTP Route (GET + POST)
# ----------------------------

@app.route(route="view_counter")
def view_counter(req: func.HttpRequest) -> func.HttpResponse:
    method = req.method.upper()

    if method == "GET":
        return get_count()
    elif method == "POST":
        return increment_count()
    else:
        return func.HttpResponse(
            '{"error": "Method Not Allowed"}',
            status_code=405,
            mimetype="application/json"
        )
