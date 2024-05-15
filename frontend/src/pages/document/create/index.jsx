import React, { useState, useEffect } from "react";
import {
    Autocomplete,
    Button,
    Typography,
    IconButton,
    Grid,
    TextField,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import { 
    useGetUnitsByClassIdQuery,
    useGetClassByInstructorIdQuery, 
    usePostAccessTokenMutation,
    usePostDocumentMutation,
    usePostFileDocumentMutation,
} from 'state/api'; // Import hook
import { getUserId_Cookie } from "utils/handleCookies";
import HomeNavbar from "components/HomeNavbar";
import { useNavigate } from 'react-router-dom';

const CreateDocument = () => {
    const navigate = useNavigate();
    const userId = getUserId_Cookie();
    const [PostDocument, { isLoading: loadingPostDocument }] = usePostDocumentMutation();
    const [PostFileDocument, { isLoading: loadingPostFileDocument }] = usePostFileDocumentMutation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [classId, setClassid] = useState("");
    const [unitsId, setUnitsId] = useState("");
    const [accessToken] = usePostAccessTokenMutation();
    const [SigningIn, setSigningIn] = useState(false);
    const [classItems, setClassItems] = useState([]);
    const [valueClass, setValueClass] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // Thêm trạng thái để lưu trữ thông báo lỗi
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [unitsError, setUnitsError] = useState("");

    const { data: classByInstructorIdData, isLoading: isClassByInstructorIdData } = useGetClassByInstructorIdQuery(userId);
    
    useEffect(() => {
        if (!isClassByInstructorIdData && classByInstructorIdData) {
            const list = classByInstructorIdData.map((item) => ({
                id: item.ma_lopHoc,
                label: item.ten,
            }));
            setClassItems(list);
        }
    }, [isClassByInstructorIdData, classByInstructorIdData]);
    
    const { data: unitsByInstructorIdData, isLoading: isUnitsByInstructorIdData } = useGetUnitsByClassIdQuery(classId);
    const [valueUnits, setValueUnits] = useState([]);
    const [unitsItem, setUnitsItem] = useState(null);
    
    useEffect(() => {
        if (!isUnitsByInstructorIdData && unitsByInstructorIdData) {
            const list = unitsByInstructorIdData.map((item) => ({
                id: item.ma_chuong,
                label: item.ten
            }));
            setUnitsItem(list);
        }
    }, [isUnitsByInstructorIdData, unitsByInstructorIdData]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        if (event.target.value) {
            setTitleError("");
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        if (event.target.value) {
            setDescriptionError("");
        }
    };

    const handleDrop = (acceptedFiles) => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles
        ]);
    };

    const getFileIcon = (fileName) => {
        const extension = fileName.split(".").pop().toLowerCase();
        if (["jpg", "png", "gif"].includes(extension)) {
            return <ImageIcon />;
        } else if (["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "txt"].includes(extension)) {
            return <DescriptionIcon />;
        } else {
            return <DescriptionIcon />;
        }
    };

    const removeFile = (indexToRemove) => {
        setFiles(prevFiles => prevFiles.filter((file, index) => index !== indexToRemove));
    };

    const handleUpload = async () => {
        let valid = true;

        if (!title) {
            setTitleError("Vui lòng nhập tiêu đề.");
            valid = false;
        }
        if (!description) {
            setDescriptionError("Vui lòng nhập mô tả.");
            valid = false;
        }
        if (!unitsId) {
            setUnitsError("Vui lòng chọn chương.");
            valid = false;
        }

        if (!valid) {
            return;
        }

        try {
            setSigningIn(true);
            const res = await PostDocument({
                tieuDe: title,
                noiDung: description,
                machuong: unitsId,
            });
            const documentId = res.data.ma_hocLieu;
            await handleUploadFile(documentId);
            setSigningIn(false);
            setErrorMessage(""); 
            navigate(`/document/edit/${documentId}`);
        } catch (error) {
            setSigningIn(false);
            console.log("Error:", error);
            setErrorMessage("Đã xảy ra lỗi khi tải lên tài liệu. Vui lòng thử lại sau."); // Cập nhật thông báo lỗi khi xảy ra lỗi
        }
    };

    const handleUploadFile = async (documentId) => {
        const access_token = await accessToken();
        for (let i = 0; i < files.length; i++) {
            const metadata = {
                name: files[i].name,
                mimeType: files[i].type,
                parents: ["1CKsdv6fMuyDcu0orfaIjOzgN_Nsn5u5u"],
            };
            const formData = new FormData();
            formData.append(
                "metadata",
                new Blob([JSON.stringify(metadata)], { type: "application/json" }),
            );
            formData.append("file", files[i]);

            const response = await fetch(
                "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
                {
                    method: "POST",
                    headers: new Headers({
                        Authorization: "Bearer " + access_token.data.token,
                    }),
                    body: formData,
                }
            );
            try {
                const data = await response.json();
                await PostFileDocument({
                    ma_file: data.id,
                    tenFile: files[i].name,
                    ma_hoclieu: documentId,
                });
            } catch (error) {
                console.log("Error:", error);
                setErrorMessage("Đã xảy ra lỗi khi tải lên tệp. Vui lòng thử lại sau."); // Cập nhật thông báo lỗi khi xảy ra lỗi
            }
        }
    };

    const formHeight = 350 + files.length * 90;

    return (
        <Grid container style={{ backgroundColor: "#e0e0e0" }}>
            <Grid item xs={12} style={{ backgroundColor: "#F9EDED" }}>
                <HomeNavbar IsNotHomePage={true} title="Create Document" />
                
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} style={{ height: "93.5vh" }}>
                            <form
                                style={{
                                    backgroundColor: "white",
                                    border: '0.1px solid #ccc',
                                    marginTop: "50px",
                                    marginLeft: "30px",
                                    height: `${formHeight}px`,
                                    padding: "0",
                                    borderRadius: "20px",
                                }}
                            >
                                <TextField
                                    id="title-text"
                                    label="Title"
                                    variant="filled"
                                    style={{ width: "95%", marginTop: "20px", marginLeft: "30px", fontSize: "30px" }}
                                    value={title}
                                    onChange={handleTitleChange}
                                    error={!!titleError}
                                    helperText={titleError}
                                />
                                <TextField
                                    id="description-text"
                                    label="Description"
                                    variant="filled"
                                    multiline
                                    rows={6}
                                    style={{ width: "95%", height: "20vh", marginTop: "20px", marginLeft: "30px", fontSize: "30px" }}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    error={!!descriptionError}
                                    helperText={descriptionError}
                                />
                                <List>
                                    {files.map((file, index) => (
                                        <ListItem key={index} 
                                            style={{                                    
                                                borderRadius: "50px",
                                                border: '0.1px solid #ccc', 
                                                marginTop: '30px', 
                                                marginLeft: "30px", 
                                                padding: '10px', 
                                                width: "70%", 
                                                fontSize: "30px" 
                                            }}
                                        >
                                            {getFileIcon(file.name)}
                                            <ListItemText primary={file.name} />
                                            <IconButton onClick={() => removeFile(index)}><CloseIcon /></IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </form>
                            <Dropzone onDrop={handleDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} 
                                        style={{ 
                                            backgroundColor: "white", 
                                            marginTop: "30px", 
                                            marginLeft: "30px", 
                                            border: '0.1px solid #ccc', 
                                            height: '20%', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            cursor: 'pointer',
                                            borderRadius: "50px",
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        <Typography component="div" style={{ color: "black", fontSize: '20px' }}>
                                            Upload file by dragging and dropping or click here
                                        </Typography>
                                    </div>
                                )}
                            </Dropzone>
                        </Grid>
                        <Grid item xs={0.5} style={{width:'10px'}}></Grid>
                        <Grid item xs={3} 
                            style={{
                                backgroundColor:'white',
                                marginTop:'60px',
                                border: '0.1px solid #ccc',
                                height:'400px',
                                borderRadius: "20px",
                            }} 
                        >
                            <Typography>
                                For:
                            </Typography>
                            <Autocomplete
                                value={valueClass}
                                onChange={(event, newValue) => {
                                    setValueClass(newValue);
                                    if (newValue) {
                                        setClassid(newValue.id);
                                    }
                                }}
                                disablePortal
                                id="combo-box-class"
                                options={classItems}
                                sx={{ width: 350, marginTop: "10px", marginBottom: "50px" }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Class"
                                        color="success"
                                        size="small"
                                    />
                                )}
                            />
                            <Typography>
                                Subject:
                            </Typography>
                            <Autocomplete
                                value={valueUnits}
                                onChange={(event, newValue) => {
                                    setValueUnits(newValue);
                                    if (newValue) {
                                        setUnitsId(newValue.id);
                                        setUnitsError(""); // Xóa thông báo lỗi khi người dùng chọn chương
                                    }
                                }}
                                disablePortal
                                id="combo-box-units"
                                options={unitsItem ? unitsItem : []}
                                getOptionLabel={(option) => option ? option.label || '' : ''}
                                sx={{ width: 350, marginTop: "10px" }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Subject"
                                        color="success"
                                        size="small"
                                        error={!!unitsError} // Hiển thị lỗi nếu có
                                        helperText={unitsError} // Thông báo lỗi
                                    />
                                )}
                                isOptionEqualToValue={() => true}
                            />
                            {errorMessage && (
                                <Typography color="error" style={{ marginTop: "20px", marginLeft: "30px" }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                sx={{
                                    marginTop: "50px",
                                    marginLeft: "80px",
                                    width: "200px",
                                    height: "40px",
                                    backgroundColor: "#009265",
                                    "&:hover": {
                                        backgroundColor: "#007850",
                                    },
                                }}
                                type="submit"
                                disabled={SigningIn}
                                onClick={handleUpload}
                            >
                                {SigningIn ? (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: "white",
                                        }}
                                    />
                                ) : (
                                    "Upload Document"
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreateDocument;
