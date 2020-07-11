hello:
	echo "Building who's watching..."

build:
	go build -o whos_watching main.go
	codesign -s - whos_watching

run:
	./whos_watching

all: hello build run

