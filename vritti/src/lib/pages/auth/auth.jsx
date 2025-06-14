import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
const Auth = () =>{
    return <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
  <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Login</TabsTrigger>
       
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Don't have an account yet? Sign up
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">email address</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
                        <Button>Save password</Button>
              <Button>Google</Button>
              <Button>Twitter</Button>

            </CardFooter>
          </Card>
        </TabsContent>
          
      </Tabs>
    </div>

        </div>
    </div>
}

export default Auth;