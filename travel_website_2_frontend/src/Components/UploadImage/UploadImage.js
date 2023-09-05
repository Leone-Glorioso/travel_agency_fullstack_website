import {useState} from "react";
import {Button, Form} from "semantic-ui-react";
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";

function UploadImage(name)
{
    const [newFile, SetNewFile] = useState([]);
    const Auth = useAuth()

    const fileChange = (event) => {
        SetNewFile( event.target.files[0] );
    };

    const onFormSubmit = async () =>{
        try {
            const response = ApiConnector.uploadImage(Auth.user.user, newFile, name)
        }
        catch(e)
        {
            console.log(e)
        }
    }

    return(
            <Form.Field>
                <Button as="label" htmlFor="file" type="button">
                    Add Image
                </Button>
                <input type="file" id="file" hidden onChange={fileChange} />
                {/*<Button type="submit" onClick={onFormSubmit}>Upload</Button>*/}
            </Form.Field>
    )
}

export default UploadImage