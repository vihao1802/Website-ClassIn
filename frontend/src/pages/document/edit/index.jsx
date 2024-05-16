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
    ListItemText,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useParams } from 'react-router-dom';
import { 
    useGetDocumentsByDocumentIdQuery,
    useGetFileDocumentsByUnitsIdQuery,
    useGetClassDetailsQuery,
    useGetUnitsQuery,
    usePutDocumentMutation,
    usePostAccessTokenMutation,
    useDeleteFileDocumentMutation,
    usePostFileDocumentMutation,
    useDeleteDocumentMutation,
} from 'state/api'; 
import { getUserId_Cookie } from "utils/handleCookies";
import { useNavigate } from 'react-router-dom';
import HomeNavbar from "components/HomeNavbar";
const EditDocument = () => {
    // 343cac63-adee-468b-8f43-5ecf10ef31af
    const navigate = useNavigate();
    const userId = getUserId_Cookie();
    let { documentId } = useParams();
    const [teacherId,setTeacherId] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Thêm trạng thái để lưu trữ thông báo lỗi
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [SigningIn, setSigningIn] = useState(false);

    //const [classId,setClassId] = useState("");
    //const [unitsId,setUnitsId] = useState("75f9837b-cf42-4260-80de-58c412fc4c2f");
    const REACT_APP_GOOGLE_DRIVE_API_KEY="AIzaSyBnRYgL_mPNKHmEKteVJw-fcf7P3dCJIwI";
    const [PostFileDocument, {isLoading: loadingPostFileDocument }] = usePostFileDocumentMutation();
    const [DeleteFileDocument,{isLoading:loadingDeleteFileDocument}] =useDeleteFileDocumentMutation();
    const [PutDocument, { isLoading: isPutDocumentMutation }] = usePutDocumentMutation();
    const [DeleteDocument, { isLoading: isDeleteDocumentMutation }] = useDeleteDocumentMutation();
    const [accessToken] = usePostAccessTokenMutation();
    const [access_token,setAccess_token]=useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await accessToken();
                setAccess_token(result.data.token); // Giả sử dữ liệu trả về từ accessToken là một object có trường 'token'
            } catch (error) {
                console.error("Lỗi khi lấy access token:", error);
                // Xử lý lỗi ở đây nếu cần
            }
        };

        fetchData();

        // Clean up effect (nếu cần)
        return () => {
            // Thực hiện clean up nếu cần
        };
    }, [accessToken]); 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [textclass, setTextClass] = useState("");
    const [textunits, setTextUnits] = useState("");
    const [files, setFiles] = useState([]);
    const [filesOld, setFilesOld] = useState([]);
    const [deletedFiles, setDeletedFiles] = useState([]);
    const {
        data:DocumentsByDocumentId,
        isLoading : isDocumentsByDocumentId,
    } = useGetDocumentsByDocumentIdQuery(documentId);

    useEffect(() => {
        // Chỉ thiết lập title và description nếu DocumentsByDocumentId đã có dữ liệu
        
        if (!isDocumentsByDocumentId && DocumentsByDocumentId ) {
            //console.log(DocumentsByDocumentId);
            //console.log(DocumentsByDocumentId.ma_chuong);
            setTitle(DocumentsByDocumentId.tieuDe);
            setDescription(DocumentsByDocumentId.noiDung);
            setTextClass(DocumentsByDocumentId.tenLopHoc);
            setTextUnits(DocumentsByDocumentId.tenChuong);
            setTeacherId(DocumentsByDocumentId.maGiangVien);
              

        }
      }, [isDocumentsByDocumentId, DocumentsByDocumentId]);
    const {
        data:FileDocumentsByUnitsId,
        isLoading : isFileDocumentsByUnitsId,
    } = useGetFileDocumentsByUnitsIdQuery(documentId);

    const [soLanChay, setSoLanChay] = useState(0);
    useEffect(() => {
        if (soLanChay < 1 && !isFileDocumentsByUnitsId && FileDocumentsByUnitsId) {
            console.log(FileDocumentsByUnitsId);
            const google_drive_url = "https://www.googleapis.com/drive/v2/files";
            FileDocumentsByUnitsId.forEach(async (file) => {
                const data = await (
                    await fetch(
                        `${google_drive_url}/${file.ma_file}?key=${REACT_APP_GOOGLE_DRIVE_API_KEY}`,
                        {
                            method: "GET",
                        },
                    )
                ).json();
                setFilesOld((danhSachHienTai) => {
                    return [
                        ...danhSachHienTai,
                        {
                            name: data.title,
                            id: data.id,
                            alternateLink: data.alternateLink,
                            downloadUrl: data.downloadUrl,
                        },
                    ];
                });
            });
            setSoLanChay(soLanChay + 1);
        }
    }, [soLanChay, isFileDocumentsByUnitsId, FileDocumentsByUnitsId]);


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
        if(fileName != null)
        {
            const extension = fileName.split(".").pop().toLowerCase();
            if (extension === "jpg" || extension === "png" || extension === "gif") {
                return <ImageIcon />;
            } else if (extension === "pdf" || extension === "doc" || extension === "docx" || extension === "ppt" || extension === "pptx" || extension === "xls" || extension === "xlsx" || extension === "txt") {
                return <DescriptionIcon />;
            } else {
                // Trả về biểu tượng tệp thông thường
                return <DescriptionIcon />;
            }
        }
    };

    const removeFile = (indexToRemove,index) => {
        if(index === 1)
        {
            setDeletedFiles((currentList) => {
                return [
                    ...currentList,
                    filesOld[indexToRemove],
                ];
            });
            setFilesOld(prevFiles => prevFiles.filter((file, index) => index !== indexToRemove));
        }
        else
        {
            setFiles(prevFiles => prevFiles.filter((file, index) => index !== indexToRemove));
        }

    };
    
    const handleUpload = async () => {    
        // console.log(documentId);
        // console.log(DocumentsByDocumentId);
        // console.log(DocumentsByDocumentId.tieuDe);
        // console.log(DocumentsByDocumentId.noiDung);
        // console.log(title);
        // console.log(description);
        //console.log(filesOld);
        let valid = true;

        if (!title) {
            setTitleError("Vui lòng nhập tiêu đề.");
            valid = false;
        }
        if (!description) {
            setDescriptionError("Vui lòng nhập mô tả.");
            valid = false;
        }


        if (!valid) {
            return;
        }
        console.log("deletedFiles",deletedFiles);
        console.log("New file:",files);

        try 
        {
            setSigningIn(true);
            //console.log("Mã access token:",access_token);
            const res = await PutDocument({
                tieuDe: title,
                noiDung: description,
                ma_hocLieu: documentId,
            });
            console.log("Upload document successfully");
            console.log(res);
            await UploadFile(documentId);
            await DeleteFileOld(documentId);
            setSigningIn(false);
            window.location.reload();

        }
        catch (error) {
            setSigningIn(false);
            console.log('Failed to upload document: ', error);
        }
    };
    const UploadFile = async (documentId) => {
        //console.log("Document ID:", documentId);        
         //luu file len drive
        //  const temp = await accessToken();
        //  console.log(temp);
        //  setAccess_token(temp);
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
                         Authorization: "Bearer " + access_token,
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
    const DeleteFileOld = async(documentId) => {
        const GOOGLE_DOMAIN = "https://www.googleapis.com/drive/v3/files";
        for (let i = 0; i < deletedFiles.length; i++) {
            console.log("Id cua file xoa:",i,"-",deletedFiles[i].id);
            const res = await DeleteFileDocument({
                ma_hocLieu:documentId,
                ma_file:deletedFiles[i].id,
            });
            try {
                const response = await fetch(`${GOOGLE_DOMAIN}/${deletedFiles[i].id}`, {
                  method: "DELETE",
                  headers: new Headers({
                    Authorization: "Bearer " + access_token,
                  }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }

            
        }
        //console.log("ma access token 2:",temp);

    }
    const handleFileClick = (e, link) => {
        e.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
        window.open(link, '_blank'); // Mở liên kết trong một tab mới
    }
    const handleDeleteDocument = async () => {
        try {
            setSigningIn(true);
            const res = await DeleteDocument({ma_hocLieu: documentId});
            console.log("Delete document successfully");
            setSigningIn(false);
            navigate('/classin');
        }
        catch (error) {
            setSigningIn(false);
            console.log('Failed to delete document: ', error);
        }
    };
    const formHeight = 300 + files.length * 95 + filesOld.length * 95;

    return (
        <Grid container style={{ backgroundColor: "#e0e0e0" }}>
            <Grid item xs={12} style={{ backgroundColor: "#F9EDED" }}>
            <HomeNavbar IsNotHomePage={true} title="Document" />
                
                
                <Grid item xs={12} >
                    <Grid container spacing={2}>
                        <Grid item xs={8} >
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
                                    error={!!titleError}
                                    InputProps={userId === teacherId ? {readOnly: false} : {
                                        readOnly: true, // Ngăn người dùng chỉnh sửa
                                    }}
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
                                    error={!!descriptionError}
                                    InputProps={userId === teacherId ? {readOnly: false} : {
                                        readOnly: true, // Ngăn người dùng chỉnh sửa
                                    }}
                                    onChange={handleDescriptionChange}
                                />
                                
                                <List>
                                    {filesOld.length > 0 && (
                                        <List>
                                            {filesOld.map((file, index) => (
                                                <ListItem key={index} 
                                                style={{                                    
                                                    borderRadius: "50px",
                                                    border: '0.1px solid #ccc', 
                                                    marginTop: '30px', 
                                                    marginLeft: "30px", 
                                                    padding: '10px', 
                                                    width: "70%", 
                                                    fontSize: "30px" 
                                                }}>
                                                    {getFileIcon(file.name)}
                                                    <ListItemText primary={file.name} />
                                                    <IconButton onClick={(e) => handleFileClick(e, file.alternateLink)}><FileOpenIcon /></IconButton>
                                                    {userId === teacherId && (
                                                        <IconButton onClick={() => removeFile(index,1)}><CloseIcon /></IconButton>
                                                    )}
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                    {files.map((file, index) => (
                                        
                                        <ListItem 
                                        style={{                                    
                                            borderRadius: "50px",
                                            border: '0.1px solid #ccc', 
                                            marginTop: '30px', 
                                            marginLeft: "30px", 
                                            padding: '10px', 
                                            width: "70%", 
                                            fontSize: "30px" 
                                        }}>
                                        {getFileIcon(file.name)}
                                            <ListItemText primary={file.name} />
                                            <IconButton onClick={() => removeFile(index,2)}><CloseIcon /></IconButton>                                     
                                        </ListItem>
                                    
                                    ))}
                                </List>


                            </form>
                            {userId === teacherId && (<Dropzone onDrop={handleDrop}>
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
                            </Dropzone>)}
                            
                        </Grid>
                        <Grid item xs={0.5}  ></Grid>
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
                                <TextField
                                    id="class-text"
                                    label="Class"
                                    //variant="filled"
                                    style={{ width: 300, marginTop: "20px", marginLeft: "30px", fontSize: "30px" }}
                                    InputProps={{
                                        readOnly: true, // Ngăn người dùng chỉnh sửa
                                    }}
                                    value={textclass}
                                    // onChange={handleTitleChange}
                                />
                                <Typography>
                                    Subject:
                                </Typography>
                                <TextField
                                    id="units-text"
                                    label="Unints"
                                    //variant="filled"
                                    style={{ width: 300, marginTop: "20px", marginLeft: "30px", fontSize: "30px" }}
                                    InputProps={{
                                        readOnly: true, // Ngăn người dùng chỉnh sửa
                                    }}
                                    value={textunits}
                                />
                                {
                                userId === teacherId && (
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
                                            "Update"
                                        )}
                                    </Button>
                                    )
                                }
                                {
                                userId === teacherId && (
                                    <Button
                                        variant="contained"
                                        sx={{
                                            marginTop: "30px",
                                            marginLeft: "80px",
                                            width: "200px",
                                            height: "40px",
                                            backgroundColor: "#D20103",
                                            "&:hover": {
                                                backgroundColor: "#B30406",
                                            },
                                        }}
                                        type="submit"
                                        disabled={SigningIn}
                                        onClick={handleDeleteDocument}
                                    >
                                        {SigningIn ? (
                                            <CircularProgress
                                                size={24}
                                                sx={{
                                                    color: "white",
                                                }}
                                            />
                                        ) : (
                                            "Delete"
                                        )}
                                    </Button>
                                    )
                                }



                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default EditDocument;