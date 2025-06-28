import { Card, CardContent } from "@mui/material"
import { AlertCircle } from "lucide-react"

interface AlertProps{
    title: string
    info: string
}

export default function Alert({info, title}: AlertProps){
  return(
    <Card className="bg-amber-50 border-amber-200 w-full">
      <CardContent className="p-4 text-sm text-amber-800">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" data-testid="lucide-icon" />
          <div className="flex-1">
            <p className="font-medium">{title}</p>
            <p className="mt-1">
              {info}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}