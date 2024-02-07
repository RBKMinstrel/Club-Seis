# CLUB SEIS

## Requirements

- Node 20.6.1.
- Java 17.
- Maven 3.8+.
- MySQL 8.

## Database creation

```
Start Mysql server if not running (e.g. mysqld).

mysqladmin -u root create clubseis -p
mysqladmin -u root create clubseistest -p

mysql -u root -p
    CREATE USER 'cs'@'localhost' IDENTIFIED BY 'cs';
    GRANT ALL PRIVILEGES ON clubseis.* to 'cs'@'localhost' WITH GRANT OPTION;
    GRANT ALL PRIVILEGES ON clubseistest.* to 'cs'@'localhost' WITH GRANT OPTION;
    exit
```

## Run

```
cd backend
mvn sql:execute (only first time to create tables)
mvn spring-boot:run

cd frontend
npm install (only first time to download libraries)
npm run dev
```
