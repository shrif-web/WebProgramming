import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def sumNodejs(self):
        self.client.post("/nodejs/sha256", json=
        {
            "firstNumber": 1,
            "secondNumber": 2
        })

    @task
    def sumGo(self):
        self.client.post("/go/sha256", json=
        {
            "firstNumber": 3,
            "secondNumber": 4
        })
        
    @task
    def writeNodejs(self):
        self.client.get("/nodejs/write?lineNumber=5")

    @task
    def writeGo(self):
        self.client.get("/go/write?lineNumber=6")