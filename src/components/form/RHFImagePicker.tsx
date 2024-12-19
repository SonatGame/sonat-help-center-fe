import { CloudIcon } from "@/packages/course/icons";
import { Close } from "@mui/icons-material";
import {
  CardMedia,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Asterisk from "./Asterisk";

interface IRHFImagePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  control: Control<T, any>;
  required?: boolean;
  sx?: SxProps;
  rules?: any;
}

export function RHFImagePicker<T extends FieldValues>({
  name,
  control,
  label,
  required,
  sx,
  rules,
}: IRHFImagePickerProps<T>) {
  const theme = useTheme();
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
  };

  return (
    <Stack spacing={0.5} width="100%" sx={{ ...sx }}>
      <Typography variant="body2">
        {label}&nbsp;
        {required && <Asterisk />}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl>
            <label style={{ cursor: "pointer", flexGrow: 1 }}>
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  border: image ? "none" : `1px solid ${theme.palette.divider}`,
                  borderRadius: 1.5,
                }}
              >
                {image ? (
                  <>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      image={image}
                      alt="Selected Image"
                    />
                    <IconButton
                      onClick={(e) => {
                        handleRemoveImage(e);
                        field.onChange(undefined);
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      <Close />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <CloudIcon sx={{ fontSize: 40 }} />
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="bold"
                    >
                      Ấn vào để đăng tải
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      hoặc kéo và thả
                    </Typography>
                  </>
                )}
              </Stack>
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  e.target.files?.[0] && field.onChange(e.target.files?.[0]);
                  handleImageChange(e);
                }}
              />
            </label>
            {!!error && (
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
}
