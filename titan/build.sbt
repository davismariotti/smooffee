name := """titan"""
organization := "com.davismariotti"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies ++= Seq("com.novocode" % "junit-interface" % "0.11" % "test")

crossPaths := false