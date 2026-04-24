const db = require('../config/db');
const { z } = require('zod');
const { calculateDistance } = require('../utils/geo');

// Zod schema for input validation
const addSchoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180")
});

const listSchoolsSchema = z.object({
  latitude: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= -90 && parseFloat(val) <= 90, "Invalid latitude"),
  longitude: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= -180 && parseFloat(val) <= 180, "Invalid longitude")
});

exports.addSchool = async (req, res) => {
  try {
    const validatedData = addSchoolSchema.parse(req.body);
    const { name, address, latitude, longitude } = validatedData;
    
    // Insert into DB
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, address, latitude, longitude]);
    
    res.status(201).json({
      message: 'School successfully added',
      schoolId: result.insertId
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: err.flatten().fieldErrors 
      });
    }
    console.error("Database Error: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const validatedQuery = listSchoolsSchema.parse(req.query);
    const userLat = parseFloat(validatedQuery.latitude);
    const userLon = parseFloat(validatedQuery.longitude);

    // Fetch all schools from the database
    const [rows] = await db.query('SELECT * FROM schools');

    // Calculate distance for each school and sort
    const schoolsWithDistance = rows.map(school => {
      const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: err.flatten().fieldErrors 
      });
    }
    console.error("Database Error: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
