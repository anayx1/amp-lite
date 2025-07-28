"use client"

import { useState } from "react"
import {
    Button,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    Container,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { Link, Router } from "react-router-dom"

// Mock data for team members
const initialTeamMembers = [
    {
        id: 1,
        name: "Jason Price",
        role: "Admin",
        email: "janick_parisian@yahoo.com",
        avatar: "/media/1.png?height=100&width=100",
    },
    {
        id: 2,
        name: "Jukkoe Sisao",
        role: "CEO",
        email: "sibyl_kozey@gmail.com",
        avatar: "/media/3.png?height=100&width=100",
    },
    {
        id: 3,
        name: "Harriet King",
        role: "CTO",
        email: "nadia_block@hotmail.com",
        avatar: "/media/1.png?height=100&width=100",
    },
    {
        id: 4,
        name: "Lenora Benson",
        role: "Lead",
        email: "fel.wallace@kunde.us",
        avatar: "/media/3.png?height=100&width=100",
    },
    {
        id: 5,
        name: "Olivia Reese",
        role: "Strategist",
        email: "kemmer.harber@cronin.us",
        avatar: "/media/1.png?height=100&width=100",
    },
    {
        id: 6,
        name: "Bertha Valdez",
        role: "CEO",
        email: "torano.koelpin@tromp.io",
        avatar: "/media/3.png?height=100&width=100",
    },
    {
        id: 7,
        name: "Harriett Payne",
        role: "Digital Marketer",
        email: "nannie_west@estrella.tv",
        avatar: "/media/1.png?height=100&width=100",
    },
    {
        id: 8,
        name: "George Bryant",
        role: "Social Media",
        email: "delmer.king@gmail.com",
        avatar: "/media/3.png?height=100&width=100",
    },
    {
        id: 9,
        name: "Lily French",
        role: "Strategist",
        email: "lucienne.romaguera@hotmail.com",
        avatar: "/media/1.png?height=100&width=100",
    },
    {
        id: 10,
        name: "Howard Adkins",
        role: "CEO",
        email: "wiegand.koepp@herman.us",
        avatar: "/media/3.png?height=100&width=100",
    },
    {
        id: 11,
        name: "Earl Bowman",
        role: "Digital Marketer",
        email: "waine_reininger@estrella.tv",
        avatar: "/media/1.png?height=100&width=100",
    },
    {
        id: 12,
        name: "Patrick Padilla",
        role: "Social Media",
        email: "octavia.ritchie@hotmail.net",
        avatar: "/media/1.png?height=100&width=100",
    },
]

// API call function (commented as requested)
/*
const fetchTeamMembers = async () => {
  try {
    const response = await fetch('https://api.example.com/team-members');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};
*/

const TeamList = () => {
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
    // const [open, setOpen] = useState(false)
    // const [newMember, setNewMember] = useState({
    //     name: "",
    //     role: "",
    //     email: "",
    //     avatar: "/placeholder.svg?height=100&width=100",
    // })

    // Uncomment to use API data
    /*
    useEffect(() => {
      const getTeamMembers = async () => {
        const members = await fetchTeamMembers();
        setTeamMembers(members);
      };
      
      getTeamMembers();
    }, []);
    */

    const handleOpen = () => {
        Router.push('/admin/Add-team')
        // setOpen(true)
    }

    // const handleClose = () => {
    //     setOpen(false)
    // }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target
    //     setNewMember({
    //         ...newMember,
    //         [name]: value,
    //     })
    // }

    // const handleAddMember = () => {
    //     if (newMember.name && newMember.role && newMember.email) {
    //         const newTeamMember = {
    //             id: teamMembers.length + 1,
    //             ...newMember,
    //         }

    //         setTeamMembers([...teamMembers, newTeamMember])
    //         setNewMember({
    //             name: "",
    //             role: "",
    //             email: "",
    //             avatar: "/placeholder.svg?height=100&width=100",
    //         })
    //         handleClose()
    //     }
    // }

    return (
        <Container maxWidth="lg" className="py-3">
            <Box className="flex justify-between items-center mb-6">

                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Team
                </Typography>
                <Link to={'/admin/Add-team'}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        className="bg-blue-500 hover:bg-blue-600"

                    >
                        Add New Member
                    </Button>
                </Link>
            </Box>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {teamMembers.map((member) => (
                    <div key={member.id} className="w-full">
                        <div className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 bg-white rounded-lg">
                            <div className="flex flex-col items-center text-center p-6">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-24 h-24 mb-4 rounded-full"
                                />
                                <h2 className="font-semibold mb-1 text-lg">
                                    {member.name}
                                </h2>
                                <p className="mb-2 text-gray-600 text-sm">
                                    {member.role}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {member.email}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Member Dialog */}

        </Container>
    )
}

export default TeamList

