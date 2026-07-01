
function SubTitle({ mainTitle, description }: { mainTitle: string, description: string }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {mainTitle}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
                {description}
            </p>
        </div>
    )
}

export default SubTitle