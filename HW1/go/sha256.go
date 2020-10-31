package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

type SumRequestBody struct {
	FirstNumber  int `json:"firstNumber"`
	SecondNumber int `json:"secondNumber"`
}

type SumResponseBody struct {
	Sum string `json:"sum"`
}

type LineNumber struct {
	Line int `json:"line"`
}

type LineContent struct {
	Line string `json:"line"`
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

	sum := sumReq.FirstNumber + sumReq.SecondNumber
	h := sha256.New()
	h.Write([]byte(strconv.Itoa(sum)))
	md := h.Sum(nil)
	mdStr := hex.EncodeToString(md)
	result := SumResponseBody{Sum: mdStr}
	json.NewEncoder(w).Encode(result)
}

func line(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		fmt.Fprintf(w, "Sorry, only POST methods are supported.")
		return
	}
	liness, ok := r.URL.Query()["lineNumber"]

	if !ok || len(liness[0]) < 1 {
		log.Println("Url Param 'line' is missing")
		return
	}

	key := liness[0]
	fmt.Println(string(key))
	lineNumber, _ := strconv.Atoi(key)

	if lineNumber < 1 || lineNumber > 100 {
		fmt.Fprintf(w, "Input must be between 1 and 100")
		return
	}

	fileIO, err := os.OpenFile("input.txt", os.O_RDWR, 0600)
	if err != nil {
		panic(err)
	}
	defer fileIO.Close()
	rawBytes, err := ioutil.ReadAll(fileIO)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(rawBytes), "\n")
	w.Header().Set("Content-Type", "application/json")
	for i, line := range lines {
		if i == lineNumber-1 {
			if i == 99 {
				json.NewEncoder(w).Encode(LineContent{line})
			} else {
				runes := []rune(line)
				json.NewEncoder(w).Encode(LineContent{string(runes[0 : len(line)-1])})
			}
		}
	}
}

func main() {

	var port = ":8000"
	fmt.Println("Starting Go Server At localhost", port)
	http.HandleFunc("/sha256", sumRequestHandler)
	http.HandleFunc("/write", line)
	http.ListenAndServe(port, nil)
}
