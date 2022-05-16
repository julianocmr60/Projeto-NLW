import { CloseButton } from "../closeButton";
import bugImageUrl from "../../Assets/bug.svg";
import ideaImageUrl from "../../Assets/idea.svg";
import thoughtImageUrl from "../../Assets/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./steps/feedbackTypeStep";
import { FeedbackContentStep } from "./steps/feedbackContentStep";
import { FeedbackSuccessStep } from "./steps/feedbackSuccessStep";

 export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image:{
            source: bugImageUrl,
            alt: "Imagem de um inseto"
        },
    },
    IDEA: {
        title: "Ideia",
        image:{
            source: ideaImageUrl,
            alt: "Imagem de uma lampada"
        },
    },
    OTHER: {
        title: "Outro",
        image:{
            source: thoughtImageUrl,
            alt: "Imagem de um balão de pensamento"
        }
    }
};

export type feedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState <feedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2x1 mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            { feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                {!feedbackType ?(
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
            ):(
                <FeedbackContentStep 
                feedbackType = {feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={()=> setFeedbackSent(true)}/>
            )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ❤ por <a href="https://github.com/julianocmr60">Juliano Rossi</a>
            </footer>
        </div>
    )
}