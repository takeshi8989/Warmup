#!/bin/bash



# Global variables from root directory .env file
aws_account_id=$(grep "AWS_ACCOUNT_ID=" .env | cut -d'=' -f2)
aws_region=$(grep "AWS_REGION=" .env | cut -d'=' -f2)

cd "locationWS"
echo "Deploying locationWS.."

# Global variables from locationWS directory .env file
task_family=$(grep "TASK_FAMILY=" .env | cut -d'=' -f2)
service_name=$(grep "SERVICE_NAME=" .env | cut -d'=' -f2)
cluster_name=$(grep "CLUSTER_NAME=" .env | cut -d'=' -f2)



function push_image_ecr() {
    echo "Logging into AWS ECR..."
    aws ecr get-login-password --region $aws_region | docker login --username AWS --password-stdin $aws_account_id.dkr.ecr.$aws_region.amazonaws.com
    echo "Building Docker image..."
    docker build -t warmup .
    docker tag warmup:latest $aws_account_id.dkr.ecr.$aws_region.amazonaws.com/warmup:latest
    docker push $aws_account_id.dkr.ecr.$aws_region.amazonaws.com/warmup:latest
}


function configure_ecs_task() {
    echo "Configuring ECS task..."
    aws ecs describe-task-definition --task-definition $task_family --query taskDefinition > task-definition-read.json
    aws ecs register-task-definition --family $task_family --cli-input-json file://task-definition.json
    new_revision="$(cat task-definition-read.json | jq .revision)"
    aws ecs update-service --cluster $cluster_name --service $service_name --task-definition $task_family:$new_revision
    let old_revision=new_revision-1
    aws ecs deregister-task-definition --task-definition $task_family:$old_revision
    cd ..
    exit 0
}



push_image_ecr
configure_ecs_task