package main

import (
	"io/ioutil"
	"fmt"
	"log"
	"net/http"
	"encoding/json"
)

type reqBodyType struct {
	firstNumber int
	secondNumber int
}

func request(w http.ResponseWriter, r *http.Request){
	if(r.Method != "POST"){
		fmt.Fprintf(w, "Sorry, only POST methods are supported.")
		return;
	}
	reqBodyJson, err := ioutil.ReadAll(r.Body)
    if err != nil {
        log.Fatal(err)
	}
	var reqBody reqBodyType
	json.Unmarshal(reqBodyJson, &reqBody)
	fmt.Println(reqBody)
	fmt.Fprintf(w,"Hello, GO!")
}

func main() {
	var port=":8000";
	fmt.Println("Starting Go Server At localhost", port)
	http.HandleFunc("/",request);
	http.ListenAndServe(port, nil)
}

