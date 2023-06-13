import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('cloud-resume-view-number')
def lambda_handler(event, context):
  response = table.get_item(
    Key={
        'id': '0'
    })
  view_number = response['Item']['view_number']
  view_number += 1
  print(view_number)
  response = table.put_item(
    Item={
    'id': '0',
    'view_number': view_number
  })

  return view_number

