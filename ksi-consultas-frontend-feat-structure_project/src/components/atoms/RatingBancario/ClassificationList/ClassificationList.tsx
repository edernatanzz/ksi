'use client'

import { Chip, List, ListItem, ListItemText } from "@mui/material"

interface ClassificationListProps {
    classifications: string[]
    activeClassification: string
}

export function ClassificationList({ classifications, activeClassification }: ClassificationListProps){
    return(
        <List dense className="w-fit justify-center">
            {classifications.map((classification) => (
                <ListItem key={classification} sx={{ py: 0.5 }}>
                    <ListItemText
                        primary={
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{classification}</span>
                                {classification === activeClassification && (
                                    <Chip
                                        label="Atual"
                                        size="small"
                                        color="primary"
                                        variant="filled"
                                        sx={{ ml: 2, fontSize: "0.75rem", height: "20px" }}
                                    />
                                )}
                            </div>
                        }
                        sx={{
                            "& .MuiListItemText-primary": {
                                color: classification === activeClassification ? "#e02725" : "#112331",
                                fontWeight: classification === activeClassification ? 600 : 400,
                            }
                        }}
                    />
                </ListItem>
            ))}
        </List>
    )
}