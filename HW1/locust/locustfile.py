import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def sum(self):
        result = self.client.post("/sha256", 
        {
            "firstNumber": 1,
            "secondNumber": 2
        })
        print("result text:", result.sum)
        
    @task
    def write(self):
        result = self.client.get("/write", 
        {
            "lineNumber": 3
        })
        print("result text:", result)
