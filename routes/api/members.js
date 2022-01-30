const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Gets All members
router.get("/", (req, res) => res.json(members));

// Get Single Member
router.get("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id),
    );

    if (found) {
        res.json(
            members.filter((member) => member.id === parseInt(req.params.id)),
        );
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`,
        });
    }
});

// Create Member
router.post("/", (req, res) => {
    // Create new object in data
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    };

    // Check if they have name and email
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: "Please include a name and email" });
    }

    // Add new object to data array
    members.push(newMember);

    // Return all data when successful
    res.json(members);
});

// Update Member
router.put("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id),
    );

    // Check to see if member exist
    if (found) {
        // Update member, by getting email and name
        const updMember = req.body;
        // Loop through the members we have, and check to see if it matches the ID, then update it
        members.forEach((member) => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: "Member updated", member });
            }
        });
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`,
        });
    }
});

module.exports = router;
