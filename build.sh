#!/bin/bash
UAT="uat"
echo "Build docker '$1' image '$2'" &&
  if [ $1 == $UAT ]; then
    # Docker Build
    docker image build -t aims-customer-portal:uat-"$2" . &&
    # Push to uat registry
    echo "Tag docker uat image '$2'" &&
    docker image tag aims-customer-portal:uat-"$2" asia-south1-docker.pkg.dev/ajex-production/images/ajex/aims-customer-portal:"$2" &&
      docker image push asia-south1-docker.pkg.dev/ajex-production/images/ajex/aims-customer-portal:"$2" &&
    echo "Pushed docker uat image aims-customer-portal:uat-'$2'" &&
    echo "$2" >>uat-version.txt
  else
    # Docker Build
    docker image build -f Dockerfile.stage -t aims-customer-portal:stage-"$2" .

    # Push to stage registry
    echo "Tag docker stage image '$2'"
    docker image tag aims-customer-portal:stage-"$2" asia-south2-docker.pkg.dev/middleware-test-339406/images/ajex/aims-customer-portal:"$2" &&
      echo "Push docker stage image '$2'"
    docker image push asia-south2-docker.pkg.dev/middleware-test-339406/images/ajex/aims-customer-portal:"$2" &&
      echo "Pushed docker stage image aims-customer-portal:stage-'$2'"
    echo "$2" >>stage-version.txt
  fi
