name := """arabica"""
organization := "com.davismariotti"
maintainer := "davismariotti@gmail.com"

version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies ++= Seq("com.novocode" % "junit-interface" % "0.11" % "test")
libraryDependencies += "org.postgresql" % "postgresql" % "42.2.5"
libraryDependencies += "com.graphql-java" % "graphql-java" % "11.0"
libraryDependencies += "com.graphql-java-kickstart" % "graphql-java-tools" % "5.5.0"
libraryDependencies += "com.google.code.gson" % "gson" % "2.8.5"
libraryDependencies += "com.sun.jersey" % "jersey-core" % "1.19.4"
libraryDependencies += "com.sun.jersey" % "jersey-client" % "1.19.4"
libraryDependencies += "com.sun.jersey.contribs" % "jersey-multipart" % "1.19.4"
libraryDependencies += "com.google.firebase" % "firebase-admin" % "6.7.0"
libraryDependencies += "com.h2database" % "h2" % "1.4.198"
libraryDependencies += "com.stripe" % "stripe-java" % "8.0.2"
libraryDependencies += "org.apache.commons" % "commons-lang3" % "3.8.1"
libraryDependencies ++= Seq(evolutions, jdbc)

crossPaths := false

unmanagedResourceDirectories in Compile += baseDirectory.value / "resources"