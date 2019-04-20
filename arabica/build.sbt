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
libraryDependencies += "com.google.firebase" % "firebase-admin" % "6.8.0" excludeAll ExclusionRule(organization = "commons-logging")
libraryDependencies += "com.h2database" % "h2" % "1.4.198"
libraryDependencies += "com.stripe" % "stripe-java" % "9.4.0"
libraryDependencies += "org.apache.commons" % "commons-lang3" % "3.8.1"
libraryDependencies += "com.google.guava" % "guava" % "27.1-jre"
libraryDependencies ++= Seq(evolutions, jdbc)

crossPaths := false

PlayKeys.externalizeResources := false

unmanagedResourceDirectories in Compile += baseDirectory.value / "resources"

mainClass in assembly := Some("play.core.server.ProdServerStart")
fullClasspath in assembly += Attributed.blank(PlayKeys.playPackageAssets.value)

assemblyMergeStrategy in assembly := {
  case manifest if manifest.contains("MANIFEST.MF") => MergeStrategy.discard // We don't need manifest files since sbt-assembly will create one with the given settings
  case referenceOverrides if referenceOverrides.contains("reference-overrides.conf") => MergeStrategy.concat // Keep the content for all reference-overrides.conf files
  case x if x.contains("io.netty.versions.properties") => MergeStrategy.discard
  case x => (assemblyMergeStrategy in assembly).value(x)
}
