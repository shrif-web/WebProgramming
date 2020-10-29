import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def sum(self):
        self.client.post("/sha256", 
        {
            "firstNumber": 1,
            "secondNumber": 2
        })
        
    @task
    def write(self):
        self.client.get("/write?lineNumber=3")