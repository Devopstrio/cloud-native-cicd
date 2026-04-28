provider "azurerm" {
  features {}
}

provider "aws" {
  region = var.aws_region
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.project_name}-${var.environment}"
  location = var.location
}

# Azure AKS (Production Delivery Cluster)
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-${var.project_name}-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "nexus"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_DS3_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}

# AWS EKS (Secondary Region / DR Cluster)
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "eks-${var.project_name}-${var.environment}"
  cluster_version = "1.27"

  vpc_id     = var.aws_vpc_id
  subnet_ids = var.aws_subnet_ids

  eks_managed_node_groups = {
    default = {
      min_size     = 1
      max_size     = 5
      desired_size = 3
      instance_types = ["t3.medium"]
    }
  }
}

# Shared Database (Azure PostgreSQL)
resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "db-${var.project_name}-${var.environment}"
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  version                = "13"
  administrator_login    = "psqladmin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "GP_Standard_D2ds_v4"
}
