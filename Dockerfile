# Use OpenJDK with Maven for build and runtime
FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Expose port
EXPOSE $PORT

# Run the application with render profile
CMD ["sh", "-c", "java -Dserver.port=$PORT -Dspring.profiles.active=render -jar target/online-banking-system-0.0.1-SNAPSHOT.jar"]
