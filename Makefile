hello:
	echo "Building who's watching..."

build:
	go build -o whos_watching_exec main.go
	codesign -s - whos_watching_exec

run:
	./whos_watching_exec

all: hello build run

