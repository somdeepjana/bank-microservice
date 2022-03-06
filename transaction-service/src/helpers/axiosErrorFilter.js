const axios= require("axios").default;

const axiosErrorFilter= (axiosError)=>{
    if(!axios.isAxiosError(axiosError)){
        throw new Error("Passed Value is not a axiosError");
    }

    if(axiosError.config.headers.Authorization){
        if(axiosError.config.headers){
            if(axiosError.config.headers.Authorization){
                axiosError.config.headers.Authorization="CLEANED AUTHORIZATION HEADER FOR SECURITY RESONS";
            }
        }
    }

    if(axiosError.request){
        if(axiosError.request._currentRequest){
            if(axiosError.request._currentRequest._header){
                axiosError.request._currentRequest._header= "CLEANED HEADER FOR SECURITY RESONS CHECK OTHER PARAMETER FROM CONFIG";
            }
        }
    }

    if(axiosError.response){
        if(axiosError.response.request){
            if(axiosError.response.request._header){
                axiosError.response.request._header= "CLEANED HEADER FOR SECURITY RESONS CHECK OTHER PARAMETER FROM CONFIG";
            }
        }
        if(axiosError.response.data){
            axiosError.response.data= "CLEARED FOR SECURITY RESONS";
        }
        if(axiosError.response.config){
            if(axiosError.response.config.data){
                axiosError.response.config.data= "CLEARED FOR SECURITY RESONS";
            }
        }
    }

    if(axiosError.config.data){
        axiosError.config.data= "CLEARED FOR SECURITY RESONS";
    }

}

module.exports= axiosErrorFilter;