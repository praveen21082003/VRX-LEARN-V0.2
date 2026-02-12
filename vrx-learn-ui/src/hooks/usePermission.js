import {ROLE_PERMISSION} from '@/config/permission.js'
import {useAuth} from "@/context/AuthContext";

export function usePermission(){

    const {role} = useAuth();

    const can = (permission)=>{
        if (!role) return false;

        return ROLE_PERMISSION[role]?.includes(permission);
    };

    return {can}
    
}