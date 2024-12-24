import { CloudIcon } from "@/lib/constants/icons";
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
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import Asterisk from "./Asterisk";

interface IRHFImagePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  control: Control<T, any>;
  required?: boolean;
  sx?: SxProps;
  rules?: any;
  imageUrl?: string;
}

export function RHFImagePicker<T extends FieldValues>({
  name,
  control,
  label,
  required,
  sx,
  rules,
  imageUrl,
}: IRHFImagePickerProps<T>) {
  const theme = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (field: ControllerRenderProps<T, Path<T>>) => {
    setImage(null);
    field.onChange(undefined);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLabelElement>,
    field: ControllerRenderProps<T, Path<T>>
  ) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      field.onChange(file);
      handleImageChange(file);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);

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
          <FormControl sx={{ flexGrow: 1 }}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                border: image ? "none" : `1px solid ${theme.palette.divider}`,
                borderRadius: 1.5,
                backgroundColor: isDragging
                  ? theme.palette.action.hover
                  : "transparent",
              }}
            >
              {image ? (
                <>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "auto",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    image={image}
                    alt="Selected Image"
                  />
                  <IconButton
                    onClick={() => {
                      handleRemoveImage(field);
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
                <label
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, field)}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{ py: 2 }}
                  >
                    <CloudIcon sx={{ fontSize: 40 }} />
                    <Stack
                      direction="row"
                      justifyContent="center"
                      gap={0.5}
                      flexWrap="wrap"
                    >
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
                    </Stack>
                  </Stack>
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        handleImageChange(file);
                      }
                    }}
                  />
                </label>
              )}
            </Stack>

            {!!error && (
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
}
