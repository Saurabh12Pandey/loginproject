provider "docker"{}
resource "local_file" "batch4"{
        filename = "/home/ubuntu/practice/demo.txt"
        content = "This is created by terrafrom"
}
resource "docker_image" "nginx"{
        name="nginx:latest"
        keep_locally = false
}
resource "docker_container" "nginx-ctr" {
        name="my-nginx-container"
        image=docker_image.nginx.name
        ports{
                internal=80
                external=80
        }
}
