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

## Configuration Management for Container

In Azure, a storage would be managed by Iac. However, we observe that whether the containers are managed by Iac in Azure Bicep in uncertain

As the updated deployment, we obsered that the previous version of container was not removed.