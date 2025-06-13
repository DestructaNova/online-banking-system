# Multi-stage build for Spring Boot application
FROM maven:3.9-openjdk-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim

WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy the built jar file
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE $PORT

# Run the application
CMD ["sh", "-c", "java -Dserver.port=$PORT -Dspring.profiles.active=h2 -jar app.jar"]
