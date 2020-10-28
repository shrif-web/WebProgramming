package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type SumRequestBody struct {
	FirstNumber  int `json:"firstNumber"`
	SecondNumber int `json:"secondNumber"`
}

type SumResponseBody struct {
	Sum int `json:"sum"`
}

func sumRequestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		fmt.Fprintf(w, "Sorry, only POST methods are supported.")
		return
	}
	reqBodyJson, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}
	sumReq := SumRequestBody{}
	json.Unmarshal(reqBodyJson, &sumReq)
	fmt.Printf("%+v\n", sumReq)
	w.Header().Set("Content-Type", "application/json")
	fmt.Println((sumReq.FirstNumber + sumReq.SecondNumber))
	sum := SumResponseBody{Sum: (sumReq.FirstNumber + sumReq.SecondNumber)}
	json.NewEncoder(w).Encode(sum)
}

func main() {
	var port = ":8000"
	fmt.Println("Starting Go Server At localhost", port)
	http.HandleFunc("/sha256", sumRequestHandler)
	http.ListenAndServe(port, nil)
}
