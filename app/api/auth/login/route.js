// Path: app/api/auth/signin/route.js
// get credentials from request body



export default async function SignIn(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        // if (!email || !password) {
        //     return res.status(400).json({ error: "Missing email or password" });
        // }
        // const user = await prisma.user.findFirst({ where: { email } });
        // if (!user) {
        //     return res.status(404).json({ error: "User not found" });
        // }
        // const valid = await bcrypt.compare(password, user.password);
        // if (!valid) {
        //     return res.status(401).json({ error: "Incorrect password" });
        // }
        // const session = await prisma.session.create({
        //     data: {
        //         userId: user.id,
        //         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        //     },
        // });
        return res.status(200).json('session');
    }
    return res.status(405).json({ error: "Method not allowed" });
}