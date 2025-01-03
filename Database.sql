-- Table: Table
CREATE TABLE DiningTable (
    TableID SERIAL PRIMARY KEY,
    Seats INT NOT NULL CHECK (Seats > 0),
    Status VARCHAR(20) DEFAULT 'Available' CHECK (Status IN ('Available', 'Reserved'))
);

-- Table: Customer
CREATE TABLE Customer (
    Email VARCHAR(100) PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Phone VARCHAR(15) NOT NULL
);

-- Table: Reservation
CREATE TABLE Reservation (
    ReservationID SERIAL PRIMARY KEY,
    Email VARCHAR(100) NOT NULL REFERENCES Customer(Email),
    TableID INT NOT NULL REFERENCES DiningTable(TableID),
    Date DATE NOT NULL,
    TimeSlot TIME NOT NULL,
    Status VARCHAR(20) DEFAULT 'Pending Confirmation' 
        CHECK (Status IN ('Pending Confirmation', 'Confirmed', 'Cancelled')),
    UNIQUE (TableID, Date, TimeSlot)
);

-- Table: Dish
CREATE TABLE Dish (
    DishID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL
);

-- Table: DishDetail
CREATE TABLE DishDetail (
    DetailID SERIAL PRIMARY KEY,
    ReservationID INT NOT NULL REFERENCES Reservation(ReservationID) ON DELETE CASCADE,
    DishID INT NOT NULL REFERENCES Dish(DishID),
    Quantity INT NOT NULL CHECK (Quantity > 0),
    TotalPrice DECIMAL(10, 2)
);

-- Function to calculate total price
CREATE OR REPLACE FUNCTION calculate_total_price()
RETURNS TRIGGER AS $$
BEGIN
    NEW.TotalPrice := NEW.Quantity * (SELECT Price FROM Dish WHERE DishID = NEW.DishID);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate total price before insert or update
CREATE TRIGGER trg_calculate_total_price
BEFORE INSERT OR UPDATE ON DishDetail
FOR EACH ROW
EXECUTE FUNCTION calculate_total_price();
