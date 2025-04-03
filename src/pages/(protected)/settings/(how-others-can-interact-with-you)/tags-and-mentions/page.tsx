import { useState } from "react";
import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";

export default function PageTagsAndMentions() {
  const [tags, setTags] = useState("subscribed");
  const [mentions, setMentions] = useState("subscribed");

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Метки и упоминания</h2>

      <Card className="mb-4">
        <CardContent >
          <h3 className="text-lg font-medium mb-2">Кто может отмечать вас</h3>
          <FormControl component="fieldset">
            <RadioGroup value={tags} onChange={(e) => setTags(e.target.value)}>
              <FormControlLabel value="all" control={<Radio />} label="Разрешить метки любым пользователям" />
              <FormControlLabel value="subscribed" control={<Radio />} label="Разрешить метки только людям, на которых вы подписаны" />
              <FormControlLabel value="none" control={<Radio />} label="Запретить метки" />
            </RadioGroup>
          </FormControl>
          <Button variant="outlined" className="mt-3">Одобрять метки вручную</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-medium mb-2">Кто может @упоминать вас</h3>
          <FormControl component="fieldset">
            <RadioGroup value={mentions} onChange={(e) => setMentions(e.target.value)}>
              <FormControlLabel value="all" control={<Radio />} label="Разрешить упоминания для всех" />
              <FormControlLabel value="subscribed" control={<Radio />} label="Разрешить упоминания людям, на которых вы подписаны" />
              <FormControlLabel value="none" control={<Radio />} label="Запретить упоминания" />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}