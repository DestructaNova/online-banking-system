# Use official OpenJDK runtime as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build application
RUN ./mvnw clean package -DskipTests -Dspring.profiles.active=production

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-Dserver.port=8080", "-Dspring.profiles.active=production", "-jar", "target/*.jar"]
