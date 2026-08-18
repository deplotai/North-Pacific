-- Add new columns to the offers table
ALTER TABLE offers ADD COLUMN IF NOT EXISTS show_countdown BOOLEAN DEFAULT false;
ALTER TABLE offers ADD COLUMN IF NOT EXISTS discount_percentage INT DEFAULT NULL;

-- Update the existing row (since there's only one row for config)
UPDATE offers SET show_countdown = false, discount_percentage = NULL;
