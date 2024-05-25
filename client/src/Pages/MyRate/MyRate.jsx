import "./MyRate.css"

const MyRate = () => {
    return (
        <>
            <div className="container">
                <h2>Some Recent Challenges</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Last Solved</th>
                        <th>Challenge</th>
                        <th>Language</th>
                        <th>Difficulty</th>
                        <th>Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td><a href="">function to sum two numbers</a></td>
                        <td>C++</td>
                        <td>Easy</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><a href="">function to sum two numbers</a></td>
                        <td>C++</td>
                        <td>Easy</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><a href="">function to sum two numbers</a></td>
                        <td>C++</td>
                        <td>Easy</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><a href="">function to sum two numbers</a></td>
                        <td>C++</td>
                        <td>Easy</td>
                        <td>15</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyRate