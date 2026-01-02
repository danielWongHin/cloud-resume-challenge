## Install Azure bicep

In this project, we are using Azure Bicep for avoiding the statefile management from terraform.

```sh
# Fetch the latest Bicep CLI binary
curl -Lo bicep https://github.com/Azure/bicep/releases/latest/download/bicep-linux-x64
# Mark it as executable
chmod +x ./bicep
# Add bicep to your PATH (requires admin)
sudo mv ./bicep /usr/local/bin/bicep
# Verify you can now access the 'bicep' command
bicep --help
# Done!

```

### Login to Azure

```sh
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

az login
```

### Install Ansible

Azure bicep doesn't require ansible for running. However, we would like to do various configuration changes loading website files, using ansible brings us the flexibility than bash or powershell scriptings.

```sh
pipx install --include-deps ansible
```

## Install Deps for Ansible

```sh
cd azure
ansible-galaxy collection install -r requirements.txt
```

We need to directly install the deps into the venv

```sh
/usr/local/py-utils/venvs/ansible/bin/python -m pip install --upgrade pip
/usr/local/py-utils/venvs/ansible/bin/python -m pip install --upgrade "ansible[azure]"

```

### ansible[azure] issue

The collection is not install the deps correctly. Turn out to fix the issue, the requirement.txt need to be installed into the pip env.

ansible-collections/azure#1463 (comment) [https://github.com/ansible-collections/azure/blob/dev/requirements.txt]

```sh
which pip

 /home/codespace/.python/current/bin/pip install -r ./azure-requirements.txt
```
Remarks: The importance of venv

## Storage Account

The storage account is used to save the code of the webpage to host the static web page. Also, it is deployed automatically to support the Function App as well.

```sh
ansible-playbook ./playbooks/deploy-storage.yml
```

## Configuration Management for Container

In Azure, a storage would be managed by Iac. However, we observe that whether the containers are managed by Iac in Azure Bicep in uncertain

As the updated deployment, we obsered that the previous version of container was not removed.

## Cache purge

In Cache Purge, we have use `ansible-vault` to create the secret credentials, CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID. After that, we have deploy the `purge.yml` to purge the cache. The tasks have included to the `upload.yml`.

Everytime we run the below command, the modified code will be uploaded to the storage account and the cache will be purged.

```sh
ansible-playbook ./playbooks/upload.yaml --ask-vault-pass
```

## Azure Functions need Core Tools Tool Installed

You need to install Core Tools or the deploy wont work. You need to install Azure Functions extension and best to create your Azure function from that interface.

```sh
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg 
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg 
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs 2>/dev/null)-prod $(lsb_release -cs 2>/dev/null) main" > /etc/apt/sources.list.d/dotnetdev.list' 
sudo apt-get update 
sudo apt-get install azure-functions-core-tools-4
```

## Locally Test Python Env Var

```sh
cd backend-counter
source .venv/bin/activate
pip install -r requirements.txt
func start
```

## CosmosDB

```sh
ansible-playbook ./playbooks/deploy-db.yaml 
```

## Function App

To deploy the Azure Function App, the extension, Azure Function has been installed. After that, the `/backend-counter/fuction_app.py` can be deployed to Azure Function App

To test the functionality of the view_counter:

```sh
curl -x post https://viewcountercrc.azurewebsites.net/api/view_counter

curl -v https://viewcounterappcrc.azurewebsites.net/api/view_counter

curl -X POST https://viewcounterappcrc.azurewebsites.net/api/view_counter
```

Your domain name needs to be allowed in the CORS origin

## Domain Name and DNS

The domain name is registered from `Namecheap` and onboarded to `Cloudflare` for CDN and Proxy services. 