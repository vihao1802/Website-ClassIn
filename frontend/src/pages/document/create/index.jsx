import React, { useState,useEffect } from "react";
import {
    Autocomplete,
    Button,
    Typography,
    IconButton,
    AppBar,
    Toolbar,
    Box,
    Grid,
    Container,
    TextField,
    List,
    ListItem,
    ListItemText
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

const CreateDocument = () => {
    const [ PostDocument, {isLoading: loadingPostDocument }] = usePostDocumentMutation();
    const [ PostFileDocument, {isLoading: loadingPostFileDocument }] = usePostFileDocumentMutation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [classId,setClassid] = useState("");
    const [unitsId,setUnitsId] = useState("");
    const [accessToken] = usePostAccessTokenMutation();

    const [classItems, setClassItems] = useState([]);
    const [valueClass, setValueClass] = useState(null);
    const { data: classByInstructorIdData, isLoading: isClassByInstructorIdData } =
    useGetClassByInstructorIdQuery("41523dd3-3117-480a-a02c-700433f05919");
    useEffect(() => {
        //console.log(classByInstructorIdData);
        if (!isClassByInstructorIdData && classByInstructorIdData) {
            console.log("Data fetched successfully");
            const list = classByInstructorIdData.map((item) => ({
                id: item.ma_lopHoc,
                label: item.ten,
            }));
            //console.log(list);
            setClassItems(list);
        }
    }, [isClassByInstructorIdData, classByInstructorIdData]);
    
    const {
        data: unitsByInstructorIdData,
        isLoading: isUnitsByInstructorIdData,
    }= useGetUnitsByClassIdQuery(classId);
    const [valueUnits,setValueUnits] =useState([]);
    const [unitsItem,setUnitsItem] =useState(null);
    useEffect(() => {
        if(!isUnitsByInstructorIdData && unitsByInstructorIdData)
            {
                //console.log("Data fetched successfully");
                const list = unitsByInstructorIdData.map((item)=>({
                    id: item.ma_chuong,
                    label: item.ten
                }))
                setUnitsItem(list);
            }
    })
    const handleTitleChange = (event) => {
        //console.log(valueClass);
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDrop = (acceptedFiles) => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles
        ]);
    };

    const getFileIcon = (fileName) => {
        const extension = fileName.split(".").pop().toLowerCase();
        if (extension === "jpg" || extension === "png" || extension === "gif") {
            return <ImageIcon />;
        } else if (extension === "pdf" || extension === "doc" || extension === "docx" || extension === "ppt" || extension === "pptx" || extension === "xls" || extension === "xlsx" || extension === "txt") {
            return <DescriptionIcon />;
        } else {
            // Trả về biểu tượng tệp thông thường
            return <DescriptionIcon />;
        }
    };

    const removeFile = (indexToRemove) => {
        setFiles(prevFiles => prevFiles.filter((file, index) => index !== indexToRemove));
    };
    
    const handleUpload = async () => {
        if (!title || !description || !unitsId) {
            alert("Please fill in all required fields: Title, Description, and Unit");
            return;
        }
    
        try {
            console.log(title);
            console.log(description);
            console.log(unitsId);
            
            const res = await PostDocument({
                tieuDe: title,
                noiDung: description,
                machuong: unitsId,
            });
            //console.log(res.data);
            console.log(res.data.ma_hocLieu);
            // Lấy id của tài liệu từ phản hồi
            const documentId = res.data.ma_hocLieu;
            handleUploadFile(documentId);

            //console.log("Document ID:", documentId);
            // Gọi hàm upload file sau khi đã lấy được documentId
        } catch (error) {
            console.log("Error:", error);
            throw new Error("There was an error while submitting your work. Please try again later.");
        }
    };
    
    
    
    const handleUploadFile = async (documentId) => {
        console.log("Document ID:", documentId);        
         //luu file len drive
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
                    console.log(data.id);
                    console.log(files[i].name);
                    console.log(documentId);
                    await PostFileDocument({
                        ma_file: data.id,
                        tenFile: files[i].name,
                        ma_hoclieu: documentId,
                    });
             }
             catch (error) {
                 console.log("Error:", error);
                 throw new Error(
                     "There was an error while submitting your work. Please try again later.",
                 );
             }
         }
    };
    
    const formHeight = 300 + files.length * 90;

    return (
        <Grid container style={{ backgroundColor: "#e0e0e0" }}>
            <Grid item xs={12} style={{ backgroundColor: "#F9EDED" }}>
                <AppBar position="static" style={{ backgroundColor: "#fff" }}>
                    <Toolbar style={{ justifyContent: "space-between" }}>
                        <Box display="flex" alignItems="center">
                            <IconButton color="black" edge="end" >
                                <CloseIcon />
                            </IconButton>
                            <Typography component="div" style={{ color: "black", marginLeft: "30px", fontSize: "25px" }}>
                                Document
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#1a73e8",
                                width: "100px",
                                height: "35px",
                                "&:hover": {
                                    backgroundColor: "#007850",
                                },
                            }}
                            type="submit"
                            onClick={handleUpload}
                        >
                            Upload
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid item xs={12} >
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
                                }}>
                                <TextField
                                    id="title-text"
                                    label="Title"
                                    variant="filled"
                                    style={{ width: "95%", marginTop: "20px", marginLeft: "30px", fontSize: "30px" }}
                                    value={title}
                                    onChange={handleTitleChange}
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
                                />
                                <List>
                                    {files.map((file, index) => (
                                        <ListItem key={index} style={{ border: '0.1px solid #ccc', marginTop: '30px', marginLeft: "30px", padding: '10px', width: "95%", fontSize: "30px" }}>
                                            {getFileIcon(file.name)}
                                            <ListItemText primary={file.name} />
                                            <IconButton onClick={() => removeFile(index)}><CloseIcon /></IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </form>
                            <Dropzone onDrop={handleDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} style={{ backgroundColor: "white", marginTop: "30px", marginLeft: "30px", border: '0.1px solid #ccc', height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        <input {...getInputProps()} />
                                        <Typography component="div" style={{ color: "black", fontSize: '20px' }}>
                                            Upload file by dragging and dropping or click here
                                        </Typography>
                                    </div>
                                )}
                            </Dropzone>
                        </Grid>
                        <Grid item xs={4} style={{backgroundColor:'white',marginTop:'16px', border: '0.1px solid #ccc'}} >
                                <Typography>
                                    For:
                                </Typography>
                                <Autocomplete
                                    value={valueClass}
                                    onChange={(event, newValue) => {
                                        setValueClass(newValue);
                                        if (newValue) {
                                            setClassid(newValue.id);
                                            
                                            //console.log(classId);
                                    }
                                    }}
                                    disablePortal
                                    id="combo-box-class"
                                    options={classItems}
                                    sx={{ width: 280, marginTop: "10px",marginBottom:"50px" }}
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
                                        }
                                    }}
                                    disablePortal
                                    id="combo-box-units"
                                    options={unitsItem ? unitsItem : []} // Kiểm tra unitsItem trước khi sử dụng
                                    getOptionLabel={(option) => option ? option.label || '' : ''} // Kiểm tra option trước khi sử dụng
                                    sx={{ width: 280, marginTop: "10px" }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Subject"
                                            color="success"
                                            size="small"
                                        />
                                    )}
                                    isOptionEqualToValue={() => true} // Hoặc xóa prop này nếu không cần thiết
                                />




                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CreateDocument;
