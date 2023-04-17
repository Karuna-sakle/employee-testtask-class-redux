import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Services/axiosInterceptors";

const initialState = {
    employees : [],
    error : null,
    status : "",
    message:"",
    userDetails : []
}

export const fetchemployees = createAsyncThunk(
    'employees/fetchemployees',
    async ()=>{
        const response = await instance.get('employees')
        return response.data
    }
)
export const fetcheSingleEmployee= createAsyncThunk(
    'employees/fetcheSingleEmployee',
    async (id)=>{
        const response = await instance.get(`employees/${id}`)
        return response.data
    }
)

export const addEmployee = createAsyncThunk(
    'employees/addEmployee',
    async (values)=>{
        const response = await instance.post('employees',values)
        return response.data
        
    }
)
export const deleteEmployee = createAsyncThunk(
    'employees/deleteemployees',
    async (id)=>{
        const response = await instance.delete(`employees/${id}`)
        return response.data
        
    }
)

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (value)=>{
        const response = await instance.put(`employees/${value.id}`,value)
        return response.data
    }
)


const employeeslice = createSlice({
    name : "employees",
    initialState,
    reducers:{
        resetEmployee: (state, action) => {
            state.message = null;
          },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchemployees.pending , (state)=>{
            state.status = "loading"
            
        })
        .addCase(fetchemployees.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.employees = action.payload
        })
        .addCase(fetchemployees.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(addEmployee.pending , (state)=>{
            state.status = "loading"
        })
        .addCase(addEmployee.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.employees.push(action.payload);
            state.message = "User has been created successfully.";
        })
        .addCase(addEmployee.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(deleteEmployee.pending , (state)=>{
            state.status = "loading"
        })
        .addCase(deleteEmployee.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.employees.splice(action.payload, 1);
            state.message = "User has been deleted successfully.";
        })
        .addCase(deleteEmployee.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(updateEmployee.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(updateEmployee.fulfilled, (state, action)=>{
            state.status = "succeeded"
            const updatedUser = action.payload;
            const index = state.employees?.findIndex((user) => user?.id === updatedUser?.id);
            state.employees[index] = updatedUser;
            state.message = "User has been Edited successfully.";
        })
        .addCase(updateEmployee.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(fetcheSingleEmployee.fulfilled, (state,action)=>{
            state.userDetails = action.payload
        })
        .addCase(fetcheSingleEmployee.rejected, (state,action)=>{
            state.error = action.error.message;
        })
    }
})
export const {
    resetEmployee,
  } = employeeslice.actions;
  

export default employeeslice.reducer;