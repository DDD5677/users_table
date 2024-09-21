CREATE TYPE user_status AS ENUM ('active', 'blocked');

CREATE TABLE "user"(id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,email VARCHAR(100) NOT NULL UNIQUE,password VARCHAR NOT NULL,status user_status DEFAULT 'active',last_login TIMESTAMP DEFAULT NOW(),created_at TIMESTAMP DEFAULT NOW());