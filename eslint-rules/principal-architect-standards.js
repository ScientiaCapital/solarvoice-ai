/**
 * 🏗️ PRINCIPAL ARCHITECT STANDARDS - CUSTOM ESLINT RULES
 * Enterprise-grade code quality enforcement for SolarVoice AI Platform
 * 
 * @author ULTRA ELITE SQUAD GAMMA - Code Quality Engineering Corps
 * @version 1.0.0
 * @standards Knuth mathematical precision, Dijkstra algorithmic elegance, Torvalds pragmatic excellence
 */

module.exports = {
  rules: {
    /**
     * KNUTH MATHEMATICAL PRECISION RULE
     * Enforces mathematical precision in financial calculations
     */
    'knuth-mathematical-precision': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce mathematical precision in financial calculations',
          category: 'Principal Architect Standards',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          BinaryExpression(node) {
            // Check for floating point arithmetic in financial contexts
            if (node.operator === '/' || node.operator === '*') {
              const sourceCode = context.getSourceCode();
              const text = sourceCode.getText(node);
              
              // Look for money/price/amount/cost variables
              const financialKeywords = ['price', 'amount', 'cost', 'money', 'payment', 'revenue', 'commission'];
              const hasFinancialContext = financialKeywords.some(keyword => 
                text.toLowerCase().includes(keyword) || 
                sourceCode.getText().toLowerCase().includes(keyword)
              );
              
              if (hasFinancialContext) {
                // Check if using proper cent-based calculations
                const leftText = sourceCode.getText(node.left);
                const rightText = sourceCode.getText(node.right);
                
                if (!leftText.includes('Math.') && !rightText.includes('Math.')) {
                  context.report({
                    node,
                    message: 'KNUTH VIOLATION: Financial calculations must use integer arithmetic (cents) or Math utilities to avoid floating point errors'
                  });
                }
              }
            }
          }
        };
      }
    },

    /**
     * DIJKSTRA ALGORITHMIC ELEGANCE RULE
     * Enforces clean algorithmic structures and complexity limits
     */
    'dijkstra-algorithmic-elegance': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce algorithmic elegance with proper complexity limits',
          category: 'Principal Architect Standards',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        let functionComplexity = 0;
        let nestedDepth = 0;
        const maxComplexity = 15;
        const maxNesting = 4;

        function increaseComplexity() {
          functionComplexity++;
        }

        function checkComplexity(node) {
          if (functionComplexity > maxComplexity) {
            context.report({
              node,
              message: `DIJKSTRA VIOLATION: Function complexity (${functionComplexity}) exceeds maximum (${maxComplexity}). Refactor into smaller functions.`
            });
          }
        }

        function enterBlock() {
          nestedDepth++;
          if (nestedDepth > maxNesting) {
            context.report({
              node: context.getSourceCode().ast,
              message: `DIJKSTRA VIOLATION: Nesting depth (${nestedDepth}) exceeds maximum (${maxNesting}). Use early returns or extract functions.`
            });
          }
        }

        function exitBlock() {
          nestedDepth--;
        }

        return {
          FunctionDeclaration() {
            functionComplexity = 0;
            nestedDepth = 0;
          },
          FunctionExpression() {
            functionComplexity = 0;
            nestedDepth = 0;
          },
          ArrowFunctionExpression() {
            functionComplexity = 0;
            nestedDepth = 0;
          },
          'FunctionDeclaration:exit': checkComplexity,
          'FunctionExpression:exit': checkComplexity,
          'ArrowFunctionExpression:exit': checkComplexity,
          IfStatement: increaseComplexity,
          WhileStatement: increaseComplexity,
          ForStatement: increaseComplexity,
          DoWhileStatement: increaseComplexity,
          ConditionalExpression: increaseComplexity,
          SwitchCase: increaseComplexity,
          LogicalExpression: increaseComplexity,
          BlockStatement: enterBlock,
          'BlockStatement:exit': exitBlock
        };
      }
    },

    /**
     * TORVALDS PRAGMATIC EXCELLENCE RULE
     * Enforces practical code patterns and resource efficiency
     */
    'torvalds-pragmatic-excellence': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce pragmatic excellence in resource management and error handling',
          category: 'Principal Architect Standards',
          recommended: true
        },
        fixable: 'code',
        schema: []
      },
      create(context) {
        return {
          NewExpression(node) {
            // Check for inefficient object creation patterns
            if (node.callee.name === 'Array' && node.arguments.length === 0) {
              context.report({
                node,
                message: 'TORVALDS VIOLATION: Use array literal [] instead of new Array() for better performance',
                fix(fixer) {
                  return fixer.replaceText(node, '[]');
                }
              });
            }
            
            if (node.callee.name === 'Object' && node.arguments.length === 0) {
              context.report({
                node,
                message: 'TORVALDS VIOLATION: Use object literal {} instead of new Object() for better performance',
                fix(fixer) {
                  return fixer.replaceText(node, '{}');
                }
              });
            }
          },

          TryStatement(node) {
            // Check for proper error handling
            if (!node.handler) {
              context.report({
                node,
                message: 'TORVALDS VIOLATION: Try statement must have a catch handler for proper error management'
              });
            } else {
              const catchParam = node.handler.param;
              if (!catchParam || catchParam.name === 'e') {
                context.report({
                  node: node.handler,
                  message: 'TORVALDS VIOLATION: Catch parameter should have descriptive name (error, err, exception) not generic "e"'
                });
              }
            }
          },

          ForInStatement(node) {
            // Suggest more efficient iteration patterns
            context.report({
              node,
              message: 'TORVALDS VIOLATION: Consider using Object.keys(), Object.entries(), or for...of for better performance and clarity'
            });
          }
        };
      }
    },

    /**
     * VOICE AI PERFORMANCE RULE
     * Enforces <50ms response time constraints in voice processing code
     */
    'voice-ai-performance-constraints': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce performance constraints for voice AI processing',
          category: 'Principal Architect Standards',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          CallExpression(node) {
            const sourceCode = context.getSourceCode();
            const fileName = context.getFilename();
            
            // Check if this is a voice processing file
            if (fileName.includes('voice') || fileName.includes('speech') || fileName.includes('audio')) {
              // Check for setTimeout calls that might exceed 50ms
              if (node.callee.name === 'setTimeout' && node.arguments.length >= 2) {
                const timeArg = node.arguments[1];
                if (timeArg.type === 'Literal' && typeof timeArg.value === 'number' && timeArg.value > 50) {
                  context.report({
                    node: timeArg,
                    message: `VOICE AI VIOLATION: Timeout of ${timeArg.value}ms exceeds 50ms voice processing target`
                  });
                }
              }

              // Check for Promise.resolve delays
              if (node.callee.property && node.callee.property.name === 'setTimeout' && node.arguments.length >= 1) {
                const timeArg = node.arguments[0];
                if (timeArg.type === 'Literal' && typeof timeArg.value === 'number' && timeArg.value > 50) {
                  context.report({
                    node: timeArg,
                    message: `VOICE AI VIOLATION: Processing delay of ${timeArg.value}ms exceeds 50ms voice processing target`
                  });
                }
              }
            }
          }
        };
      }
    },

    /**
     * FINANCIAL ACCURACY RULE
     * Enforces 99.99% accuracy standards in payment processing
     */
    'financial-accuracy-standards': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce 99.99% accuracy standards in financial calculations',
          category: 'Principal Architect Standards',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          VariableDeclarator(node) {
            const sourceCode = context.getSourceCode();
            const fileName = context.getFilename();
            
            // Check if this is a financial/payment file
            if (fileName.includes('payment') || fileName.includes('stripe') || fileName.includes('revenue')) {
              if (node.id.name && (node.id.name.includes('rate') || node.id.name.includes('percentage'))) {
                if (node.init && node.init.type === 'Literal' && typeof node.init.value === 'number') {
                  // Check if using decimal representation for percentages
                  if (node.init.value > 1 && node.init.value < 100) {
                    context.report({
                      node: node.init,
                      message: 'FINANCIAL ACCURACY VIOLATION: Use decimal representation (0.0-1.0) for percentages to avoid calculation errors'
                    });
                  }
                }
              }
            }
          }
        };
      }
    }
  }
};