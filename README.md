# Smooffee

## Installation Instructions
#### Install the following:
1. Java JDK 8
2. Sbt
3. PostgresQL
4. [Ebean Enhancement Plugin 11 for IntelliJ](https://ebean.io/docs/tooling/idea)

## Starting the Application
#### Running Arabica
Execute the following:

```
cd arabica/build/
python setup_database.py
cd ../
sbt run
```

#### Testing Arabica
```
cd arabica
sbt test
```
You can also use `sbt testOnly path.to.test.class` to test an individual test.
