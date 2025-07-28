"use client"

import { useState } from "react"
import {
  Paper,
  Box,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { LocationOn, Email, Phone, Edit, Add, Settings, Person } from "@mui/icons-material"

export default function ProfileSidebar({ profile }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openFundsDialog, setOpenFundsDialog] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)
  const [fundsToAdd, setFundsToAdd] = useState("")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleEditOpen = () => {
    setOpenEditDialog(true)
  }

  const handleEditClose = () => {
    setOpenEditDialog(false)
  }

  const handleFundsOpen = () => {
    setOpenFundsDialog(true)
  }

  const handleFundsClose = () => {
    setOpenFundsDialog(false)
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    })
  }

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    // For now, we'll just close the dialog
    handleEditClose()
  }

  const handleAddFunds = () => {
    // Here you would typically process payment
    // For now, we'll just close the dialog
    handleFundsClose()
  }

  return (
    <>

      <Paper
        elevation={2}
        sx={{
          // p: 0,
          position: "relative",
          // overflow: "hidden",
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          height: "auto"

        }}
      >
        {/* Background image at the top */}

        {/* Action buttons */}
        {/* <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
        <IconButton
          size="small"
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          <Add fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          <Settings fontSize="small" />
        </IconButton>
      </Box> */}

        {/* Person icon button */}
        {/* <Box sx={{ position: "absolute", top: 8, left: 8 }}>
        <IconButton
          size="small"
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          <Person fontSize="small" />
        </IconButton>
      </Box> */}

        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", px: 3, pb: 3 }}>
          {/* Avatar */}
          <Avatar
            src={profile.avatar}
            sx={{
              width: 100,
              height: 100,
              border: "4px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              marginTop: "-50px",
              marginBottom: 2,
            }}
          />

          {/* Profile info */}
          <Typography variant="h6" fontWeight="bold" align="center" sx={{ mb: 0.5 }}>
            {profile.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              mb: 2,
              backgroundColor: "#f5f5f5",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              display: "inline-block",
            }}
          >
            {profile.role}
          </Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn fontSize="small" color="action" sx={{ mr: 1, minWidth: 24 }} />
              <Typography variant="body2" color="text.secondary">
                {profile.location}
              </Typography>
            </Box>

            {/* <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                pl: 4,
                mb: 1.5,
                fontSize: "0.8rem",
                lineHeight: 1.4,
              }}
            >
              {profile.address}
            </Typography> */}

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email fontSize="small" color="action" sx={{ mr: 1, minWidth: 24 }} />
              <Typography variant="body2" color="text.secondary">
                {profile.email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone fontSize="small" color="action" sx={{ mr: 1, minWidth: 24 }} />
              <Typography variant="body2" color="text.secondary">
                Phone No: {profile.phone}
              </Typography>
            </Box>
          </Box>

          {/* Mobile view fund display */}
          {isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                backgroundColor: "#12D900",
                color: "white",
                py: 0.5,
                px: 2,
                borderRadius: 1,
                mb: 2,
                width: "100%",
              }}
            >
              <Typography variant="body2" fontWeight="medium">
                Your Fund
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                $ {profile.funds.toLocaleString()}
              </Typography>
            </Box>
          )}

          {/* Action buttons */}
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <Button
              variant="contained"
              fullWidth
              size="small"
              startIcon={<Edit />}
              onClick={handleEditOpen}
              sx={{
                textTransform: "none",
                borderRadius: 1,
                backgroundColor: "#2196f3",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
                py: 0.7,
              }}
            >
              Edit profile
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="small"
              startIcon={<Add />}
              onClick={handleFundsOpen}
              sx={{
                textTransform: "none",
                borderRadius: 1,
                backgroundColor: "#2196f3",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
                py: 0.7,
              }}
            >
              Add funds
            </Button>
          </Box>
        </Box>

        {/* Edit Profile Dialog */}
        <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}>Edit Profile</DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                fullWidth
                margin="dense"
                label="Name"
                name="name"
                value={editedProfile.name}
                onChange={handleProfileChange}
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                margin="dense"
                label="Role"
                name="role"
                value={editedProfile.role}
                onChange={handleProfileChange}
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                margin="dense"
                label="Location"
                name="location"
                value={editedProfile.location}
                onChange={handleProfileChange}
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                margin="dense"
                label="Address"
                name="address"
                value={editedProfile.address}
                onChange={handleProfileChange}
                variant="outlined"
                size="small"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                type="email"
                value={editedProfile.email}
                onChange={handleProfileChange}
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                margin="dense"
                label="Phone"
                name="phone"
                value={editedProfile.phone}
                onChange={handleProfileChange}
                variant="outlined"
                size="small"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #e0e0e0" }}>
            <Button onClick={handleEditClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} variant="contained" sx={{ backgroundColor: "#2196f3" }}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Funds Dialog */}
        <Dialog open={openFundsDialog} onClose={handleFundsClose} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}>Add Funds</DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1" gutterBottom fontWeight="medium">
                Current Balance:
                <Box component="span" sx={{ color: "#4caf50", ml: 1, fontWeight: "bold" }}>
                  ${profile.funds.toLocaleString()}
                </Box>
              </Typography>
              <TextField
                fullWidth
                margin="dense"
                label="Amount to Add"
                type="number"
                value={fundsToAdd}
                onChange={(e) => setFundsToAdd(e.target.value)}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #e0e0e0" }}>
            <Button onClick={handleFundsClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleAddFunds} variant="contained" sx={{ backgroundColor: "#2196f3" }}>
              Add Funds
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  )
}

