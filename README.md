# WebProgramming
WebProgramming Project and HomeWorks (99 Fall semester)

# Assignment 1
  this is a simple program to undrestand basics of web programming
  the first part of the program adds two numbers by sha256
  the second part gives you a line from a 100 line file
  - clone the repository in your centOS virtual machine
  - use the configs and set your local roots in there
  - run the programs
  - type your virtualmachine ip on your browser
  - enjoy! :)

## nodejs 
run ```npm install``` in nodejs directory to install requirements

## go
run ```go build sha256.go``` in go directory

## locust
after installing locust using ```pip3 install locust```, run locust command in the project locust folder. Then go to 127.0.0.1:8089 and start testing!
بررسی و مقایسه نتایج و RPS های حاصل برای 4 عملیات مختلف:
در صورتی که تعداد یوزر ها را ده هزار و spawn rate را برابر 1000 در نظر بگیریم رفته رفته به دلیل لودی که بر سرور تحمیل میشود تعداد تسک های fail شده تا حدودا 30 درصد افزایش می یابد و RPS تمامی این دستورات نیز در حدود 120 خواهد بود که البته در این حالت برای دستور sha256 با nodejs و write با استفاده از go این میزان حدودا 130 خواهد بود
با کاهش تعداد یوزر ها به 1000 و spawnrate به 100 مشکل fail شدن تست ها برطرف میشود و در نهیات RPS نیز حدودا 145 خواهد بود که برای دستوراتی که از get استفاده میکنیم بیشتر از دستورات با POST است
