#!/bin/bash



# Global variables from root directory .env file
aws_account_id=$(grep "AWS_ACCOUNT_ID=" .env | cut -d'=' -f2)
aws_region=$(grep "AWS_REGION=" .env | cut -d'=' -f2)

cd "api"
echo "Deploying warmup api.."

# Global variables from locationWS directory .env file
image_name=$(grep "IMAGE_NAME=" .env | cut -d'=' -f2)
function_name=$(grep "FUNCTION_NAME=" .env | cut -d'=' -f2)



function push_image_ecr() {
    echo "Logging into AWS ECR..."
    aws ecr get-login-password --region $aws_region | docker login --username AWS --password-stdin $aws_account_id.dkr.ecr.$aws_region.amazonaws.com
    echo "Building Docker image..."
    docker build -t $image_name .
    docker tag $image_name:latest $aws_account_id.dkr.ecr.$aws_region.amazonaws.com/$image_name:latest
    docker push $aws_account_id.dkr.ecr.$aws_region.amazonaws.com/$image_name:latest
}

function update_lambda_function() {
    aws lambda update-function-code --function-name "$function_name" --image-uri $aws_account_id.dkr.ecr.$aws_region.amazonaws.com/$image_name:latest
}

push_image_ecr
update_lambda_function