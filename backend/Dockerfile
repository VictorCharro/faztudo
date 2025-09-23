FROM openjdk:17-jdk-slim

WORKDIR /app

# Copia todos os arquivos
COPY . .

# Da permissão de execução para o mvnw
RUN chmod +x ./mvnw

# Compila o projeto
RUN ./mvnw clean package -DskipTests

# Expõe a porta
EXPOSE 10000

# Comando para rodar (ajustado para encontrar o .jar)
CMD ["sh", "-c", "java -jar target/*.jar"]