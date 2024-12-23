pipeline {
	agent any
	environment{
	  SONAR_PROJECT_NAME = 'sonat-bi-fe'
	  DOCKER_IMAGE_NAME = 'asia-east1-docker.pkg.dev/sonat-bi-cid/sonat-hc/frontend:latest'
	  DOCKER_REGISTRY = 'https://asia-east1-docker.pkg.dev'
	  ANSIBLE_DIR = '/etc/ansible'
	}
	tools {
		maven 'maven'
    nodejs 'nodejs'
  }
  stages {
	stage('Build with docker') {
      steps {
        echo 'Building docker image...'
        sh 'docker build -t $DOCKER_IMAGE_NAME .'
      }
		}

	stage('Pushing image to gcr') {
      steps {
        echo 'Start pushing... with credential'
        withCredentials([file(credentialsId: 'gcr-secret-file', variable: 'GCLOUD_CREDS')]) {
              sh '''
                cat $GCLOUD_CREDS | docker login -u _json_key --password-stdin $DOCKER_REGISTRY
                docker push $DOCKER_IMAGE_NAME
              '''
        }
      }
    }
    stage('Deploy to dev server'){
      steps{
        echo 'Deploy...'
        ansiblePlaybook credentialsId: 'cid-server', disableHostKeyChecking: true, installation: 'Ansible', inventory: '/etc/ansible/hosts', playbook: '/etc/ansible/sonat-hc-fe.yaml', vaultTmpPath: ''      }
    }
  }
}