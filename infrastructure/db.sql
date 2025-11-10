-- infra/db.sql
-- Create a table to store users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (name) VALUES ('John Doe'), ('Jane Smith') 
ON CONFLICT DO NOTHING;
