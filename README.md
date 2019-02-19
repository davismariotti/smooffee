# Smooffee

## Installation Instructions
#### Install the following:
1. Java JDK 8
2. Sbt
3. PostgresQL
4. [Ebean Enhancement Plugin 11 for IntelliJ](https://ebean.io/docs/tooling/idea)

## Starting the Application
#### Running Titan
Execute the following:

```
cd titan
python build/setup_database.py
sbt run
```

#### Testing Titan
```
cd titan
sbt test
```
You can also use `sbt testOnly path.to.test.class` to test an individual test.
